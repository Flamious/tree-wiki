import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TreeComponent } from './tree/tree.component';
import { CharacterComponent } from './tree/character/character.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DescriptionComponent } from './tree/dialogs/description/description.component';
import { MatIconModule } from '@angular/material';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { AddConnectionComponent } from './tree/dialogs/add-connection/add-connection.component';


const routes: Routes = [
  { path: '', component: TreeComponent },
  { path: '**', redirectTo: '' }
]
@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    CharacterComponent,
    DescriptionComponent,
    SidebarComponent,
    AddConnectionComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpClientModule, 
    RouterModule.forRoot(routes), 
    DragDropModule,
    MatToolbarModule,
    MatIconModule,
    DropdownModule,
    NoopAnimationsModule,
    InputTextModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
