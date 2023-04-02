import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from "lodash";
import { Web3Service } from 'src/app/shared/web3.service';
import { AlertMessageService } from 'src/app/shared/alertMessage.service';
import { DialogImageComponent } from 'src/app/shared/dialog-image/dialog-image.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss'],
})
export class AchievementsComponent implements OnInit, OnChanges {
  sub: Subscription;
  @Input() achievementsAvailable: Array<string>;
  @Input() achievementsIssued: Array<AchievementsIssued>;
  @Output() onMint  = new EventEmitter<string>();
  achievementsIssuedWithURI: Array<AchievementsIssued> = [];

  constructor(public web3Service: Web3Service,
    private alertMsgService: AlertMessageService,
    private dialog: MatDialog) {}

  ngOnInit(){
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes.achievementsIssued && !changes.achievementsIssued.isFirstChange()){
      this.achievementsIssuedWithURI = [];
      _.each(this.achievementsIssued, (achievementIssued: AchievementsIssued) =>{
        this.web3Service.getTokenURI(achievementIssued.nftTokenId).then(response => {
          var newAchievementIssued = {
            achievement: achievementIssued.achievement,
            nftTokenId: achievementIssued.nftTokenId,
            tokenURI: response.replace('ipfs://','https://ipfs.io/ipfs/')    
          };
          this.achievementsIssuedWithURI.push(newAchievementIssued);
          //achievementIssued.tokenURI = response;
        }).catch(error => this.alertMsgService.showErrorMessage(`Error adding login. Error: ${error}`));
      });
    }
  }

  mint(value: string){
    this.onMint.emit(value);
  }

  isAchievementIssued(achievement){
    return _.some(this.achievementsIssued, (achievementIssued) => achievementIssued.achievement == achievement);
  }

  getAchievementURI(achievement){
    let achievementIssued = _.findLast(this.achievementsIssuedWithURI, (achievementIssued) => achievementIssued.achievement == achievement);
    return achievementIssued ? achievementIssued.tokenURI : '';
  }

  openDialog(achievement) {    
    let achievementIssued = _.findLast(this.achievementsIssuedWithURI, (achievementIssued) => achievementIssued.achievement == achievement);
    let dialogRef;
    
    let dialogImageConfig: DialogInputConfig = {
      event: 'PreviewImage',
      isAlertDialog: false,
      inputEnabled: true,
      imageURI: achievementIssued.tokenURI,
    };
    dialogRef = this.dialog.open(DialogImageComponent, {
      width: '500px',
      data: dialogImageConfig,
      disableClose: true,
    }); 
    
 
    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
