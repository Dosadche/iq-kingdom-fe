import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromFights from '../../state/fights/fight.reducer';
import * as fightsActions from '../../state/fights/fight.action';
import { Observable } from 'rxjs';
import { Fight } from 'src/app/shared/models/fight.model';
import { FightsService } from 'src/app/core/services/fights.service';
import { FightResults } from 'src/app/shared/enums/fight-results.enum';
import { FightMessages } from 'src/app/shared/enums/fight-messages.enum';
import { ModalComponent } from 'src/app/shared/components/fight-modal/fight-modal.component';
import { ConfirmationService } from 'src/app/core/services/confirmation.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { AsyncPipe, NgClass } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-fights-info',
  templateUrl: './fights-info.component.html',
  styleUrls: ['./fights-info.component.scss'],
  standalone: true,
  imports: [SharedModule, AsyncPipe, NgClass],
})
export class FightsInfoComponent implements OnInit {
  @ViewChild('fightModal') fightModal!: ModalComponent;
  isLoading = toSignal(this.store.pipe(select(fromFights.getFightsLoading)));
  fights = toSignal(this.store.pipe(select(fromFights.getFights)));
  protected readonly FightResults = FightResults;
  protected readonly FightMessages = FightMessages;

  constructor(
    private store: Store<fromFights.AppState>,
    private fightsService: FightsService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getFights();
  }

  getResult(fight: Fight): FightResults {
    return this.fightsService.getTitle(fight);
  }

  getMessage(fight: Fight): FightMessages {
    return this.fightsService.getMessage(fight);
  }

  getImage(fight: Fight): string {
    return this.fightsService.getFightImageSrc(fight);
  }

  handleFightClick(fight: Fight): void {
    if (this.getMessage(fight) === FightMessages.PendingDefence && fight.id) {
      const approve = this.confirmationService.confirm(
        'Are you sure you want to revenge this user?'
      );
      if (approve) {
        this.fightModal.startDefence(fight.id);
      }
    }
  }

  private getFights(): void {
    this.store.dispatch(new fightsActions.LoadFights());
  }
}
