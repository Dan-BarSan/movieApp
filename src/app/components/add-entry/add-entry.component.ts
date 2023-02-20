import { Component } from '@angular/core';

import { OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { EntryService } from './../../shared/entry.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Language{
  name: string;
}

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent implements OnInit{
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  languageArray: Language[] = [];
  @ViewChild('chipList') chipList;
  @ViewChild('resetEntryForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  entryForm: FormGroup;
  BindingType: any = [
    'Paperback',
    'Case binding',
    'Perfect binding',
    'Saddle stitch binding',
    'Spiral binding',
  ];
  ngOnInit() {
    this.entryApi.GetEntryList();
    this.submitEntryForm();
  }
  constructor(public fb: FormBuilder, private entryApi: EntryService) {}
  /* Remove dynamic languages */
  remove(language: Language): void {
    const index = this.languageArray.indexOf(language);
    if (index >= 0) {
      this.languageArray.splice(index, 1);
    }
  }


  /* Reactive entry form */
  submitEntryForm() {
    this.entryForm = this.fb.group({
      name: ['', [Validators.required]],
      publication_date: ['', [Validators.required]],
      comment: ['', [Validators.required]],
    });
  }

  
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.entryForm.controls[controlName].hasError(errorName);
  };


  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.languageArray.length < 5) {
      this.languageArray.push({ name: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.entryForm.get('publication_date').setValue(convertDate, {
      onlyself: true,
    });
  }


  /* Reset form */
  resetForm() {
    this.languageArray = [];
    this.entryForm.reset();
    Object.keys(this.entryForm.controls).forEach((key) => {
      this.entryForm.controls[key].setErrors(null);
    });
  }


  /* Submit entry */
  submitEntry() {
    if (this.entryForm.valid) {
      this.entryApi.AddEntry(this.entryForm.value);
      this.resetForm();
    }
  }
}

