import { Component } from '@angular/core';

import { OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { EntryService } from './../../shared/entry.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Language {
  name: string;
}


@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.css']
})
export class EditEntryComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  languageArray: Language[] = [];
  @ViewChild('chipList') chipList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  editEntryForm: FormGroup;
  BindingType: any = [
    'Paperback',
    'Case binding',
    'Perfect binding',
    'Saddle stitch binding',
    'Spiral binding',
  ];
  ngOnInit() {
    this.updateEntryForm();
  }
  constructor(
    public fb: FormBuilder,
    private location: Location,
    private entryApi: EntryService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.entryApi
      .GetEntry(id)
      .valueChanges()
      .subscribe((data) => {
        this.languageArray = data.languages;
        this.editEntryForm.setValue(data);
      });
  }
  /* Update form */
  updateEntryForm() {
    this.editEntryForm = this.fb.group({
      name: ['', [Validators.required]],
      publication_date: ['', [Validators.required]],
      comment: ['', [Validators.required]],
    });
  }


  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.editEntryForm.controls[controlName].hasError(errorName);
  };
  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.editEntryForm.get('publication_date').setValue(convertDate, {
      onlyself: true,
    });
  }
  /* Go to previous page */
  goBack() {
    this.location.back();
  }
  /* Submit entry */
  updateEntry() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you wanna update?')) {
      this.entryApi.UpdateEntry(id, this.editEntryForm.value);
      this.router.navigate(['entrys-list']);
    }
  }
}