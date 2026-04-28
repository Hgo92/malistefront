import { Component, OnInit } from '@angular/core';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-component',
  imports: [Auth],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent implements OnInit {
  username = "";

constructor(private auth : Auth, private router : Router) {}

ngOnInit(): void {
  this.username = this.auth.getUsername() ?? '';
}

onLogout() {
  const confirmed = window.confirm('Voulez-vous vraiment vous déconnecter ?');
  if (!confirmed) return;
  
  this.auth.logout();
  this.router.navigate(['/login']);
}

onCancel() {
  this.router.navigate(['/']);
}
}