import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ComponentRef,
  ViewContainerRef,
  ViewChild,
  Renderer2
} from '@angular/core';
import { ChildComponent } from './child/child.component';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  dtOptions: DataTables.Settings = {};

  data: any[];

  @ViewChild(DataTableDirective)
  private datatableElement: DataTableDirective;

  private childRow: ComponentRef<ChildComponent>;

  constructor(
    private compFactory: ComponentFactoryResolver,
    private viewRef: ViewContainerRef,
    private _renderer: Renderer2
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.loadData();
  }

  loadData() {
    this.data = [
      {
        "id": "3",
        "firstName": "Cartman",
        "lastName": "Whateveryournameis"
      },
      {
        "id": "10",
        "firstName": "Cartman",
        "lastName": "Titi"
      },
      {
        "id": "11",
        "firstName": "Toto",
        "lastName": "Lara"
      },
      {
        "id": "22",
        "firstName": "Luke",
        "lastName": "Yoda"
      },
      {
        "id": "26",
        "firstName": "Foo",
        "lastName": "Moliku"
      }
    ];
  }

  expandRow(trRef, rowData) {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      var row = dtInstance.row(trRef);
      if (row.child.isShown()) {
        row.child.hide();
        this._renderer.removeClass(trRef, 'shown');
      }
      else {
        let factory = this.compFactory.resolveComponentFactory(ChildComponent);
        this.childRow = this.viewRef.createComponent(factory);
        this.childRow.instance.data = [rowData];
        // this.childRow
        row.child(this.childRow.location.nativeElement).show();
        this._renderer.addClass(trRef, 'shown');
      }
    })
  }
}
