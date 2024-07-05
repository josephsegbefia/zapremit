import {
  Client,
  Account,
  ID,
  Databases,
  Query,
  Functions,
} from 'react-native-appwrite';

import { Alert } from 'react-native';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.zap.zapremit',
  projectId: '666034b100348722fb88',
  databaseId: '66603a0b0002b4ea0926',
  userCollectionId: '66603a2600361e714134',
  transferCollectionId: '6664dddb0029aa60eb91',
  recipientCollectionId: '66603a6400372e528f1c',
  sendOTPFunctionId: '6676918d001c2948425f',
  verifyOTPFunctionId: '667698d90013e8a44bf2',
  rateListenerFunctionId: '66808b3500059d4c564d',
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  transferCollectionId,
  recipientCollectionId,
  sendOTPFunctionId,
  verifyOTPFunctionId,
  rateListenerFunctionId,
} = config;
// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const databases = new Databases(client);
const functions = new Functions(client);

// FUNCTION EXECUTIONS
export const sendOTP = async (phoneNumber) => {
  try {
    const payload = JSON.stringify({ phoneNumber });

    console.log(payload);
    const response = await functions.createExecution(
      sendOTPFunctionId,
      payload
    );

    console.log('OTP sent:', response);
    return response;
  } catch (error) {
    console.log('Error sending OTP', error);
  }
};

export const getRate = async (baseCurrency, targetCurrency, amount) => {
  try {
    const payload = JSON.stringify({ baseCurrency, targetCurrency, amount });
    const response = await functions.createExecution(
      rateListenerFunctionId,
      payload
    );
    // console.log(response.responseBody);
    return response.responseBody;
  } catch (error) {
    console.log(error);
  }
};

export const verifyOTP = async (phoneNumber, code, userId) => {
  try {
    // Prepare the payload for the function execution
    const payload = JSON.stringify({ phoneNumber, code });

    // Execute the verification function
    const response = await functions.createExecution(
      verifyOTPFunctionId,
      payload
    );

    const responseBody = JSON.parse(response.responseBody);
    const status = responseBody.status;
    // Check the response status
    if (status === 'pending') {
      Alert.alert('Wrong OTP', 'The code you provided is incorrect');
    }
    if (status === 'approved') {
      try {
        // Update the user document to indicate the number is verified
        const updatedUser = await databases.updateDocument(
          databaseId,
          userCollectionId,
          userId,
          {
            numberIsVerified: true,
          }
        );

        // Optionally, you might want to return the updated user or a success message
        return updatedUser;
      } catch (updateError) {
        console.error('Error updating user document:', updateError);
        throw new Error('Failed to update user verification status.');
      }
    }

    // Return the response from the verification function
    return response;
  } catch (error) {
    // console.error('Error verifying code:', error);
    throw new Error('Verification failed. Please try again.');
  }
};

// OTHER FUNCTIONS
export const createUser = async (data) => {
  try {
    const email = data.email;
    const password = data.password;
    const newAccount = await account.create(ID.unique(), email, password);
    if (!newAccount) throw Error;
    await signIn(email, password);
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        country: data.country,
        phone: data.phone,
        code: data.code,
        completePhone: data.completePhone,
        flag: data.flag,
        currencyCode: data.currencyCode,
        currencyName: data.currencyName,
        currencySymbol: data.currencySymbol,
      }
    );
    await sendOTP(newUser.completePhone);
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateUserPhone = async (data, userId) => {
  try {
    const updatedUser = await databases.updateDocument(
      databaseId,
      userCollectionId,
      userId,
      {
        code: data.code,
        country: data.name,
        currencyCode: data.currencyCode,
        currencyName: data.currencyName,
        currencySymbol: data.currencySymbol,
        flag: data.flag,
        completePhone: data.completePhone,
      }
    );
  } catch (error) {
    throw new Error(error.message || 'Failed to update the number');
  }
};

export const updateUserCurrencyInfo = async (data, userId) => {
  try {
    const updatedUser = await databases.updateDocument(
      databaseId,
      userCollectionId,
      userId,
      {
        destinationCountryCode: data.destinationCountryCode,
        destinationCountry: data.destinationCountry,
        destinationCountryCurrencyCode: data.destinationCountryCurrencyCode,
        destinationCountryCurrencyName: data.destinationCountryCurrencyName,
        destinationCountryCurrencySymbol: data.destinationCountryCurrencySymbol,
        destinationCountryFlag: data.destinationCountryFlag,
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUser = async (data) => {
  try {
    const updatedUser = await databases.updateDocument(
      databaseId,
      userCollectionId,
      data.userId,
      {
        street: data.street,
        postcode: data.postcode,
        city: data.city,
        dob: data.dob,

        destinationCountry: data.destinationCountry,
        destinationCountryCurrencyCode: data.destinationCountryCurrencyCode,
        destinationCountryCurrencyName: data.destinationCountryCurrencyName,
        destinationCountryFlag: data.destinationCountryFlag,
        destinationCountryCurrencySymbol: data.destinationCountryCurrencySymbol,
        destinationCountryCode: data.destinationCountryCode,
      }
    );
    if (updatedUser) {
      try {
        const completedProfile = await databases.updateDocument(
          databaseId,
          userCollectionId,
          data.userId,
          {
            profileIsComplete: true,
          }
        );
      } catch (error) {
        throw new Error(error.message || 'Failed to mark profile as complete.');
      }
    }
    return updatedUser;
  } catch (error) {
    throw new Error(error.message || 'Failed to update user. Try again later');
  }
};
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
  } catch (error) {
    throw new Error(error);
  }
}

export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

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

export const getRecipientById = async (userId, recipientId) => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error('No current account found');

    const recipient = await databases.getDocument(
      databaseId,
      recipientCollectionId,
      recipientId
    );

    if (recipient.user.$id !== userId)
      throw new Error('Recipient does not belong to the user');

    return recipient;
  } catch (error) {
    throw new Error(error.message || error);
  }
};

export const createRecipient = async (data) => {
  try {
    const newRecipient = await databases.createDocument(
      databaseId,
      recipientCollectionId,
      ID.unique(),
      {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        code: data.code,
        country: data.country,
        callingCode: data.callingCode,
        user: data.userId,
        completePhone: data.completePhone,
        currencyName: data.currencyName,
        currencyCode: data.currencyCode,
        currencyCode: data.currencyCode,
        currencySymbol: data.currencySymbol,
        flag: data.flag,
      }
    );
    return newRecipient;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateRecipient = async (data) => {
  try {
    const updatedRecipient = await databases.updateDocument(
      databaseId,
      recipientCollectionId,
      data.documentId,
      {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        country: data.country,
        code: data.code,
        flag: data.flag,
        currencyName: data.currencyName,
        currencyCode: data.currencyCode,
        currencyCode: data.currencyCode,
        currencySymbol: data.currencySymbol,
        callingCode: data.callingCode,
        user: data.userId,
        completePhone: data.completePhone,
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
        transferCurrency: transferData.transferCurrency,
        transferCurrencyCode: transferData.transferCurrencyCode,
        transferFee: transferData.transferFee,
        totalToPay: transferData.totalToPay,
        status: transferData.status,
        inProgress: transferData.inProgress,
        transferInitiated: transferData.transferInitiated,
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
