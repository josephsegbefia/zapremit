import { Client, Account, ID, Databases, Query } from 'react-native-appwrite';
export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.zap.zapremit',
  projectId: '666034b100348722fb88',
  databaseId: '66603a0b0002b4ea0926',
  userCollectionId: '66603a2600361e714134',
  transferCollectionId: '6664dddb0029aa60eb91',
  recipientCollectionId: '66603a6400372e528f1c',
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  transferCollectionId,
  recipientCollectionId,
} = config;
// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const databases = new Databases(client);

export const createUser = async (
  firstName,
  lastName,
  email,
  password,
  countryName,
  phone
) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password);
    if (!newAccount) throw Error;
    await signIn(email, password);
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        firstName,
        lastName,
        email,
        countryName,
        phone,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getRecipients = async (userId) => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const recipients = await databases.listDocuments(
      databaseId,
      recipientCollectionId,
      [Query.equal('user', userId), Query.orderDesc('$createdAt', 'desc')]
    );
    return recipients.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const createRecipient = async (formData) => {
  try {
    const newRecipient = await databases.createDocument(
      databaseId,
      recipientCollectionId,
      ID.unique(),
      {
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        callingCode: formData.code,
        user: formData.userId,
      }
    );
    return newRecipient;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateRecipient = async (formData) => {
  try {
    const updatedRecipient = await databases.updateDocument(
      databaseId,
      recipientCollectionId,
      formData.documentId,
      {
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        callingCode: formData.code,
        user: formData.userId,
      }
    );
    return updatedRecipient;
  } catch (error) {
    throw new Error(
      error.message || 'Failed to update recipient. Try again later'
    );
  }
};

export const deleteRecipient = async (documentId) => {
  try {
    await databases.deleteDocument(
      databaseId,
      recipientCollectionId,
      documentId
    );
  } catch (error) {
    throw new Error(error);
  }
};

export const getRecipientTransfers = async (recipientId) => {
  try {
    const transfers = await databases.listDocuments(
      databaseId,
      transferCollectionId,
      [
        Query.equal('recipient', recipientId),
        Query.orderDesc('$createdAt', 'desc'),
      ]
    );
    return transfers.documents;
  } catch (error) {
    throw new Error(error);
  }
};

// Later in the development process this function may have to be updated to use zeepay API somewhere, I am not sure exactly where yet
export const createTransfer = async (transferData) => {
  try {
    const transfer = await databases.createDocument(
      databaseId,
      transferCollectionId,
      ID.unique(),
      {
        transferAmount: transferData.transferAmount,
        receivableAmount: transferData.receivableAmount,
        transferFee: transferData.transferFee,
        totalToPay: transferData.totalToPay,
        deliveryMethod: transferData.deliveryMethod,
        reason: transferData.reason,
        user: transferData.user,
        recipient: transferData.recipientId,
      }
    );
    // CALL ZEEPAY API with transfer data
    return transfer;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserLatestTransfers = async (userId) => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error('No current account found');

    const latestTransfers = await databases.listDocuments(
      databaseId,
      transferCollectionId,
      [
        Query.equal('user', userId),
        Query.orderDesc('$createdAt'),
        Query.limit(2),
      ]
    );

    if (latestTransfers.documents) {
      const transfersWithRecipients = latestTransfers.documents.map(
        (transfer) => ({
          ...transfer,
          recipient: transfer.recipient,
        })
      );

      return transfersWithRecipients;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const getTransfers = async (userId) => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const transfers = await databases.listDocuments(
      databaseId,
      transferCollectionId,
      [Query.equal('user', userId), Query.orderDesc('$createdAt', 'desc')]
    );
    if (transfers.documents) {
      const transfersWithRecipients = transfers.documents.map((transfer) => ({
        ...transfer,
        recipient: transfer.recipient,
      }));
      return transfersWithRecipients;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error(error);
  }
};
