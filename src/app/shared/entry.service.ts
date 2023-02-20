import { Injectable } from '@angular/core';
import { Entry } from './entry';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root',
})
export class EntryService {
  entrysRef: AngularFireList<any>;
  entryRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {}
  /* Create Comment */
  AddEntry(entry: Entry) {
    this.entrysRef
      .push({
        
        name: entry.name,
        publication_date: entry.publication_date,
        comment: entry.comment,
        title_id: entry.title_id,
      })
      .catch((error) => {
        this.errorMgmt(error);
      });
  }
  /* Get entry */
  GetEntry(id: string) {
    this.entryRef = this.db.object('entrys-list/' + id);
    return this.entryRef;
  }
  /* Get entry list */
  GetEntryList() {
    this.entrysRef = this.db.list('entrys-list');
    return this.entrysRef;
  }
  /* Update entry */
  UpdateEntry(id, entry: Entry) {
    this.entryRef
      .update({
        name: entry.name,
        publication_date: entry.publication_date,
        comment: entry.comment,
        title_id : entry.title_id
      })
      .catch((error) => {
        this.errorMgmt(error);
      });
  }
  /* Delete entry */
  DeleteEntry(id: string) {
    this.entryRef = this.db.object('entrys-list/' + id);
    this.entryRef.remove().catch((error) => {
      this.errorMgmt(error);
    });
  }
  // Error management
  private errorMgmt(error) {
    console.log(error);
  }
}