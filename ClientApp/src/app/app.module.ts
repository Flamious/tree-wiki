import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TreeComponent } from './tree/tree.component';
import { CharacterComponent } from './tree/character/character.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DescriptionComponent } from './tree/description/description.component';
import { MatIconModule } from '@angular/material';
import { ConnectionComponent } from './tree/connection/connection.component';


const routes: Routes = [
  { path: '', component: TreeComponent },
  { path: '**', redirectTo: '' }
]
@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    CharacterComponent,
    HeaderComponent,
    DescriptionComponent,
    ConnectionComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpClientModule, 
    RouterModule.forRoot(routes), 
    DragDropModule,
    MatToolbarModule,
    MatIconModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
