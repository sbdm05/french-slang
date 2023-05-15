import { Component, OnInit } from '@angular/core';
import { SocialSharingOriginal } from '@awesome-cordova-plugins/social-sharing';


@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.page.html',
  styleUrls: ['./social-share.page.scss'],
})
export class SocialSharePage implements OnInit {
  constructor() {}

  ngOnInit() {}

  // shareviaTwitter() {
  //   this.socialSharing
  //     .shareViaTwitter(this.message, this.imageForSharing, null)
  //     .then((success) => {
  //       alert('Success');
  //     })
  //     .catch((err) => {
  //       alert('Could not share information');
  //     });
  // }

  // shareviaTwitter() {
  //   this.socialSharing
  //     .shareViaTwitter('test', 'test')
  //     .then((success) => {
  //       alert('Success');
  //     })
  //     .catch((err) => {
  //       alert('Could not share information');
  //     });
  // }
}
