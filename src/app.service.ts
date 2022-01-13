import { Injectable } from '@nestjs/common';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import { User } from './types';

@Injectable()
export class AppService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  addNewDoc() {
    const docRef = this.firebase.db.collection('users').doc('alovelace');

    docRef
      .set({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815,
      })
      .then((resp) => console.log(resp));
  }

  async getDoc(): Promise<User> {
    const response = await this.firebase.db.collection('users').get();
    response.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });

    return response.docs[0].data() as User;
  }
}
