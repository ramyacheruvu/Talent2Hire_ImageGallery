import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})


export class HomeComponent {

  public SelectedImage;
  public Image;
  public CanPreview;
  public ImageUrls: Array<SafeResourceUrl>;

  constructor(private domSanitizer: DomSanitizer) {
    this.CanPreview = false;
    this.ImageUrls = new Array<SafeResourceUrl>();
  }

  public ClearLocalStorage() {
    this.CanPreview = false;
    localStorage.clear();
    this.ImageUrls = new Array<SafeResourceUrl>();
  }

  public RemoveFromLocalStorage() {
    this.CanPreview = false;
    localStorage.removeItem(this.SelectedImage);
    this.SanitizeImagesFromFileStorage();
  }

  public HandleImageInput(files: FileList) {
    let uploadedImage = files.item(0);
    var reader = new FileReader();

    reader.onloadend = (e) => {
      this.CanPreview = false;
      var existing = localStorage.getItem(reader.result.toString());
      if (existing != null)
        alert("oops Already exists");
      else
        localStorage.setItem(reader.result.toString(), reader.result.toString());
    }
    reader.readAsDataURL(uploadedImage);
  }

  public SanitizeImagesFromFileStorage() {
    this.ImageUrls = new Array<SafeResourceUrl>();
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        this.ImageUrls.push(this.domSanitizer.bypassSecurityTrustResourceUrl(key));
      }
    }
  }

  public PreviewImage(imageIndex: number): void {
    this.CanPreview = true;
    this.Image = this.ImageUrls[imageIndex];
    this.SelectedImage = this.ImageUrls[imageIndex];
  }
}

