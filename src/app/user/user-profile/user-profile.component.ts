import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FieldBase, Textbox, TextArea, Image } from './dynamic-form/form-field';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() fields: FieldBase<any>[] = [
    new Textbox({
      label: "旧密码:",
      type: "password",
      placeholder: "旧密码"
    }), 
    new Textbox({
      label: "新密码:",
      type: "password",
      placeholder: "新密码，至少8位"
    }), 
    new Textbox({
      label: "重复新密码:",
      type: "password",
      placeholder: "重复新密码"
    })
  ];

  public form: FormGroup;

  constructor(public router: Router,
    public activeRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.form = this.toFormGroup(this.fields);

    this.activeRoute.params.subscribe(
      params => { console.log(params) }
    );
  }

  toFormGroup(fields: FieldBase<any>[]) {
    let group: any = {};

    fields.forEach(field => {
      group[field.key] = new FormControl(field.value || '');
    });
    return new FormGroup(group);
  }
}