import { getDatabase, onValue, ref } from '@firebase/database';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function subcribeOnData(path: string): Promise<any> {
  const db = getDatabase();
  const starCountRef = ref(db, path);

  return new Promise((resolve, reject) => {
    onValue(starCountRef, (snapshot) => {
      if (snapshot.exists()) {
        const outputArray = Object.keys(snapshot.val()).map((key) => ({
          ...snapshot.val()[key],
          id: key,
        }));
        resolve(outputArray);
      } else {
        reject("Snapshot doesn't exist");
      }
    });
  });
}
