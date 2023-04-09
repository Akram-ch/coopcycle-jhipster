import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConseil } from '../conseil.model';

@Component({
  selector: 'jhi-conseil-detail',
  templateUrl: './conseil-detail.component.html',
})
export class ConseilDetailComponent implements OnInit {
  conseil: IConseil | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ conseil }) => {
      this.conseil = conseil;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
