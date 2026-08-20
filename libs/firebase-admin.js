const admin = require("firebase-admin");

const serviceAccount = {
  type: "service_account",
  project_id: "merchanndise-8428f",
  private_key_id: "896be08670156793049295ce388bb01915b3b6b7",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCekwsBoyIdQ3Pn\nwqiQsa3KBb1Zkl3fwCuGtD2zVsca1R/304NHDXX2EEd/u0C61yLevINssRIE9+Wu\nz8lAdG/r5W9i8ExAW9ICwptogUAqogH+HeIMPi96Y5SaV2muIOJYZ3wfKWCzpyJF\nvyL87/zTIhbIXKZUy0Ed0vmxbXi1Lf3g/Q05FUOPgGKfmsULGdfHzbCLSxxUqoDz\nQk4JuKdIgSpbYnmeN5oDzvHY8huFmkv29lfmOxBAvR9VZsj1v9/eVdt/G7I+1e10\ng1VKRekdkI2vQbgZmehwAwTZg53w/sjP2Mt52P0mdezClYC9SflnebaAmI/1qbUT\nsxtOfhUxAgMBAAECggEARWLZA4/iuwRLYKNcB+g/P7FQP7PccK4RPaF7iBAWEick\nlFfQTxRUQ+Wuq3T/p2HAp868ASDf3h2sulfAW3w3hvR/Tz8PVm/3Dm8h+lHoBl+a\nWJux0CKbusV8/iX2n5NTB1TMyoPcBPBCfltaz2uhaK83YdesjljbttWcnWbl1PzI\nXdtCwJR6ocRYJc7B8jLdxVenhMliSWRANyXfwekj4PaJfE75sHBHMIMjWupK/zwl\nV+CK1ME6QoQ0ZfBP84BqQo0/KzuWc7tD+gKk032mdtvcCRELJ+7VysuNTB7EDEiV\nuUq7whhW0hJpmOgVgUBPfHJuvAK9uVBoW2CblgdFiwKBgQDcR34HN4hnFS4d7Uy6\nxbWfizzE/i4Wqnu9btchnYARAsqxG7RRBjB2GZ9csZiPUOzX9Be0MEtNtwUF1a4z\nNggHsrUhal46n+qWyqjTfrVInbGNcfLPp8vSCYdV9IQSsd9KD42LJa7lZKUoprw6\nzX7ht9Yu5WW7xZS78HKrnYI6OwKBgQC4SfsR6pQc2FDU8wTMokDq3g4H/BsSJZ9u\nvunC+zw3wCG/V4C4I5mbc5OZcDLaiFLonP1Ht8+M8Qd1XNhcuUqxrBuMpFOu4Ip9\ngfKxMn7UvuTfGjy1PQ8Vj1yuyS47Rabt3UEK6P0Ing490szvxw9v04JGPfRYcqRI\ns/mPMbFLgwKBgQCUncdxpw3oPmn21vtFp8557b76SWNe93a0v+t1SoX09CU8iKyH\nXd2kUHUsXMXJK5gfuxejAlJMBIbnANuewX15dCCwgstAUlQ7mE9/IaW9cGcyPwbL\nAzKIatVcMLRKyKcVmJiuoKX3LogffR7RrYNFVnqy+SJCJXPLuNYk4wfRsQKBgQCi\nTJ0t4S6B3MwLTt76LScI8Xjf9VoN+E5Z5Q7QJhyZaL8P2UtGYCvmqLnjltlidk62\nB5RUNgA2uwr7hEIUHyc2JEG68fm0+JFfCTOodLUYPeooxd2TK+v9690PHaR2lNf3\ngjTHG/vEPBaEwgK0ZNYmgNqpa+SmhIhEcyQkxPnEawKBgEGdlvjPUtEi34wZbmGV\nr0IjxhEnh3IMQiG1cdiRid3S36+ySgsrMW+1VlsJUZVADLikETwfLV/PcRsrhzBG\newNKHSXvS598L6/HqeCrtxzZWDrVbIuKlHeo7v8N/wWgyZ0gzyD7L8Y/1gEd9BVn\nITgX1c4NS8beNpH8TbDLAu63\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-v4se5@merchanndise-8428f.iam.gserviceaccount.com",
  client_id: "110672871233177602566",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-v4se5%40merchanndise-8428f.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();
