import { Component } from '@angular/core';

import { Entry } from './../../shared/entry';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EntryService } from './../../shared/entry.service';


@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent {
  dataSource: MatTableDataSource<Entry>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  EntryData: any = [];
  displayedColumns: any[] = [
    '$key',
    'name',
    'publication_date',
    'comment',
    'title_id',
  ];
  constructor(private entryApi: EntryService) {
    this.entryApi
      .GetEntryList()
      .snapshotChanges()
      .subscribe((entrys) => {
        entrys.forEach((item) => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.EntryData.push(a as Entry);
        });
        /* Data table */
        this.dataSource = new MatTableDataSource(this.EntryData);
        /* Pagination */
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      });
  }
  /* Delete */
  deleteEntry(index: number, e) {
    if (window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.entryApi.DeleteEntry(e.$key);
    }
  }
}