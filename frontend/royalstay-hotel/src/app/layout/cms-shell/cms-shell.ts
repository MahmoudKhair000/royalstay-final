import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';

@Component({
  imports: [RouterOutlet, Sidebar, Topbar],
  selector: 'app-cms-shell',
  styleUrl: './cms-shell.css',
  templateUrl: './cms-shell.html',
})
export class CmsShell {}
