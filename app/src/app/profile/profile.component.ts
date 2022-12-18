import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { appEmailDomains } from 'src/app/shared/constants';
import { appEmailValidator } from '../shared/validators/app-email-validator';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  showEditMode = false;
  get user() {
    const { email, img } = this.authService.user!;
    return {
      email,
      img,
    };
  }
  form = this.fb.group({
    email: ['', [Validators.required, appEmailValidator(appEmailDomains)]],
    img: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  toggleEditMode(): void {
    this.showEditMode = !this.showEditMode;
  }

  saveProfile(): void {
    if (this.form.invalid) {
      return;
    }
    const { email, img } = this.form.value;
    this.authService.user = {
      email,
      img,
    } as any;
    this.toggleEditMode();
  }
}
