import {db, storage} from '../../firebase-config';
import {
  collection,
  addDoc,
  where,
  setDoc,
  doc,
  query,
  getDocs,
  updateDoc,
  runTransaction,
  writeBatch,
  getDoc,
} from 'firebase/firestore';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import UserStorage from '../Data/UserStorage';
import PartnerStorage from '../Data/PartnerStorage';
import localStorage from './localStorage';

//Firebase storage
const uploadImage = async (tblName, fileName, callback) => {
  if (fileName == null) {
    return;
  }
  try {
    const uri = fileName;
    let name = new Date().getTime() + '-media.jpg';
    let uploadUri =
      Platform.OS === 'ios' ? fileName.replace('file://', '') : uri;
    const path = tblName + '/' + name;
    const storageRef = ref(storage, path); //how the image will be address
    // Create file metadata including the content type
    const metadata = {
      contentType: 'image/jpeg',
    };
    const img = await fetch(uploadUri);
    const blob = await img.blob();
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
      },
      err => {
        callback('error');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          callback(url);
        });
      },
    );
  } catch (error) {
    callback('error');
  }
};
const userRegistration = async (userData, callback) => {
  try {
    const docRef = await addDoc(collection(db, 'Registration'), {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      birthday: userData.birthday,
      profileImg: userData.profileImg,
      langType: userData.langType,
      handed: userData.handed,
      isBiometric: userData.isBiometric,
    });
    userData.userRefId = docRef.id;
    //local storage
    localStorage.setUserTolocal(userData);
    callback({isSuccess: true});
  } catch (error) {
    callback({isSuccess: false, error});
  }
};
const DinnerChoices = async (dinnerData, callback) => {
  try {
    const docRef = await addDoc(collection(db, 'DinnerChoices'), {
      Question: dinnerData.question,
      topAnswer: dinnerData.topAnswer,
      secondAnswer: dinnerData.secondAnswer,
      thirdAnswer: dinnerData.thirdAnswer,
      userRefId: dinnerData.userRefId,
      partnerGmail: dinnerData.partnerGmail,
      determined: false,
      winner: 0,
      markOne: 8,
      markTwo: 5,
      markThree: 1,
    });
    callback('success');
  } catch (error) {
    callback('error');
  }
};
const get3choices = async (userGmail, callback) => {
  let choices = {};
  try {
    const userRef = collection(db, 'DinnerChoices');
    const q = query(userRef, where('partnerGmail', '==', userGmail));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      choices = doc.data();
      choices.choicesRefId = doc.id;
    });
    callback(choices);
  } catch (error) {
    callback(null);
  }
};

const sendOrder = async (data, callback) => {
  try {
    const prtnrRef = doc(db, 'DinnerChoices', data.choicesId);
    const docSnap = await getDoc(prtnrRef);
    if (docSnap.exists()) {
      const previousMarkOne = docSnap.data().markOne;
      const previousMarkTwo = docSnap.data().markTwo;
      const previousMarkThree = docSnap.data().markThree;
      await updateDoc(prtnrRef, {
        determined: true,
        markOne: previousMarkOne + data.markOne,
        markTwo: previousMarkTwo + data.markTwo,
        markThree: previousMarkThree + data.markThree,
      });
      const updatedMarkOne = docSnap.data().markOne + data.markOne;
      const updatedMarkTwo = docSnap.data().markTwo + data.markTwo;
      const updatedMarkThree = docSnap.data().markThree + data.markThree;
      console.log(updatedMarkOne, '\n', updatedMarkTwo, '\n', updatedMarkThree);
      marksArray = [updatedMarkOne, updatedMarkTwo, updatedMarkThree];
      const maxValue = Math.max(...marksArray);
      let maxIndexes = [];
      for (var i = 0; i < marksArray.length; i++) {
        if (marksArray[i] === maxValue) {
          maxIndexes.push(i);
        }
      }
      let isTie = false;
      if (maxIndexes.length > 1) {
        const random = Math.floor(Math.random() * maxIndexes.length);
        isTie = true;
        await updateDoc(prtnrRef, {
          winner: maxIndexes[random],
          isTie: true,
        });
      } else {
        await updateDoc(prtnrRef, {
          winner: maxIndexes[0],
          isTie: false,
        });
      }
      
      callback({success: true, winnder: maxIndexes[0], isTie});
    }
  } catch (error) {
    callback({successs: false, error});
  }
};

const addPartner = async (prtnrData, callback) => {
  userRedId(async userRef => {
    const userRefId = userRef.userRefId;
    if (userRefId !== null) {
      try {
        const docRef = await addDoc(collection(db, 'Partners'), {
          partnerGmail: prtnrData.gmail,
          firstname: prtnrData.firstname,
          age: prtnrData.age,
          gender: prtnrData.gender,
          dateOfbirth: prtnrData.dateOfbirth,
          relationType: prtnrData.relationType,
          imageUrl: prtnrData.imageUrl,
          userRefId: userRefId,
        });

        PartnerStorage.gmail = prtnrData.gmail;
        PartnerStorage.partnerRefId = docRef.id;
        PartnerStorage.firstName = prtnrData.firstname;
        PartnerStorage.age = prtnrData.age;
        PartnerStorage.gender = prtnrData.gender;
        PartnerStorage.dateOfbirth = prtnrData.dateOfbirth;
        PartnerStorage.relationType = prtnrData.relationType;
        PartnerStorage.imageUrl = prtnrData.imageUrl;
        PartnerStorage.userRefId = userRefId;
        callback('success');
      } catch (error) {
        callback('error');
      }
    } else {
      callback('error');
    }
  });
};
const addEventType = async (eventType, prntrRefId, callback) => {
  try {
    const prtnrRef = doc(db, 'Partners', prntrRefId);
    await setDoc(prtnrRef, {eventType: eventType}, {merge: true});
    callback('success');
  } catch (error) {
    callback('error');
  }
};
const importantDates = async (impDates, prntrRefId, callback) => {
  try {
    const dateRef = doc(db, 'Partners', prntrRefId);
    await setDoc(dateRef, {importantDates: impDates}, {merge: true});
    callback('success');
  } catch (error) {
    callback('error', error);
  }
};
const updateSelectedPartner = async callback => {
  try {
    const userRefID = UserStorage.userRefId;
    const prtnrRef = collection(db, 'Partners', userRefID);
    await updateDoc(prtnrRef, {selected: false});
  } catch (error) {
    console.log('eroor', error);
  }
};
const partnerChoosed = async (selected, prntrRefId, callback) => {
  try {
    try {
      const batch = writeBatch(db);
      const userRefID = UserStorage.userRefId;
      const prtnrRef = collection(db, 'Partners');
      const q = query(prtnrRef, where('userRefId', '==', userRefID));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async doc1 => {
        const docprtnrRef = doc(db, 'Partners', doc1.id);
        batch.update(docprtnrRef, {selected: false});
      });
      await batch.commit();
    } catch (error) {
      console.log('batch error ---->', error);
    }
    const chooseRef = doc(db, 'Partners', prntrRefId);
    await updateDoc(chooseRef, {selected: selected}).then(async () => {
      callback('success');
    });
  } catch (error) {
    callback('error', error);
  }
};
const updatePartnerImage = async (imageURL, isSecond, prntrRefId, callback) => {
  try {
    const updateRef = doc(db, 'Partners', prntrRefId);
    if (isSecond == true) {
      await updateDoc(updateRef, {secondimageUrl: imageURL});
    } else {
      await updateDoc(updateRef, {imageUrl: imageURL});
    }

    callback('success');
  } catch (error) {
    callback('error');
  }
};
const getRegisteredUser = async (emailId, callback) => {
  let user = {data: 'false'};
  try {
    const userRef = collection(db, 'Registration');
    const q = query(userRef, where('email', '==', emailId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      user = doc.data();
      user.userRefId = doc.id;
      user['data'] = 'true';
    });
    callback(user);
  } catch (error) {
    callback(null);
  }
};
const getInviteUser = async (userId, callback) => {
  let user = {data: 'false'};
  try {
    const inviteRef = doc(db, 'Registration', userId);
    const docSnap = await getDoc(inviteRef);
    if (docSnap.exists()) {
      user = docSnap.data();
    } else {
      console.log('Document does not exist');
    }
    callback(user);
  } catch (error) {
    callback(null);
  }
};
const getInvitePartner = async (userId, callback) => {
  let user = {data: 'false'};
  try {
    const inviteRef = doc(db, 'Partners', userId);
    const docSnap = await getDoc(inviteRef);
    if (docSnap.exists()) {
      user = docSnap.data();
    } else {
      console.log('Document does not exist');
    }
    callback(user);
  } catch (error) {
    callback(null);
  }
};
const getAllPartnersData = async (UserRefId, callback) => {
  const partners = [];
  try {
    const prtnrRef = collection(db, 'Partners');
    const q = query(prtnrRef, where('userRefId', '==', UserRefId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      let prtnrdoc = doc.data();
      console.log(doc);
      prtnrdoc.prtnrRefId = doc.id;
      partners.push(prtnrdoc);
    });
    callback(partners);
  } catch (error) {
    callback('error');
  }
};
const getPartnersData = async (UserRefId, callback) => {
  const partners = [];
  try {
    const prtnrRef = collection(db, 'Partners');
    const q = query(prtnrRef, where('userRefId', '==', UserRefId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      let prtnrdoc = doc.data();
      prtnrdoc.prtnrRefId = doc.id;
      partners.push(prtnrdoc);
    });
    let prtnrList = partners.filter(prtnr => prtnr.selected == true);
    if (prtnrList.length > 0) {
      callback(prtnrList);
    } else {
      callback(partners);
    }
  } catch (error) {
    callback('error');
  }
};
const getPrtnrTasks = async callback => {
  const tasks = [];
  try {
    const tasksRef = collection(db, 'Tasks');
    const querySnapshot = await getDocs(tasksRef);
    querySnapshot.forEach(doc => {
      let task = doc.data();
      tasks.push(task);
    });
    if (tasks.length > 0) {
      callback(tasks);
    } else {
      callback('error');
    }
  } catch (error) {
    callback('error');
  }
};
//local storage
// const getUserdata = async (callback) => {
//     try {
//         let jsonValue = await AsyncStorage.getItem('USER');
//         if (jsonValue != null) {
//             jsonValue = (JSON.parse(jsonValue));
//             callback(jsonValue);
//         }
//         else {
//             callback('error111');
//         }
//     } catch (e) {
//         callback('error');
//     }
// }

const userRedId = async callback => {
  try {
    let jsonValue = await AsyncStorage.getItem('USER');
    if (jsonValue != null) {
      jsonValue = JSON.parse(jsonValue);
      callback(jsonValue);
    } else {
      callback('error');
    }
  } catch (e) {
    callback('error');
  }
};
export default {
  uploadImage,
  userRegistration,
  addPartner,
  addEventType,
  getPartnersData,
  getAllPartnersData,
  importantDates,
  getRegisteredUser,
  partnerChoosed,
  updatePartnerImage,
  getPrtnrTasks,
  DinnerChoices,
  getInviteUser,
  getInvitePartner,
  get3choices,
  sendOrder,
};
