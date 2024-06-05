import { Client, Account, ID, Databases } from 'react-native-appwrite';
export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.zap.zapremit',
  projectId: '666034b100348722fb88',
  databaseId: '66603a0b0002b4ea0926',
  userCollectionId: '66603a2600361e714134',
  recipientCollectionId: '66603a6400372e528f1c',
};

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
