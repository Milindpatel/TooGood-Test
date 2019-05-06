import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TestsInfo } from './test-search.model';

interface AppState {
  message: string;
}

@Component({
  selector: 'app-test-search',
  templateUrl: './test-search.component.html',
  styleUrls: ['./test-search.component.css']
})
export class TestSearchComponent implements OnInit {

  /** Holds form instance */
  public testSearchForm: FormGroup;

  /** Holds test names */
  public testList: any[];

  /** Holds filtered  test */
  public filteredTestList: any[];

  public showList: boolean;
  public showChip: boolean;
  public selectedTestsInfo: TestsInfo[];


  @ViewChild('listWrapper') public listWrapper: ElementRef;
  @ViewChild('controlRef') public controlRef: ElementRef;

  constructor(private formBuilder: FormBuilder) {
    this.initTestSearchForm();
    this.testList = [
      { index: 0, name: 'ram' },
      { index: 1, name: 'shyam' },
      { index: 2, name: 'sushil' },
      { index: 3, name: 'sushil1' },
      { index: 4, name: 'sushil2' },
      { index: 5, name: 'sushil3' },
      { index: 6, name: 'sushil4' },
      { index: 7, name: 'ram4' },
      { index: 8, name: 'ram4' },
      { index: 9, name: '4ram1' }
    ];
    this.filteredTestList = [];
    this.selectedTestsInfo = [];
    this.showList = true;
  }

  ngOnInit() {
  }

  /**
   * Initialize form control.
   */
  private initTestSearchForm(): void {
    this.testSearchForm = this.formBuilder.group({
      testSearch: []
    });
  }

  public onKeyUp() {
    const controlValue: string = this.testSearchForm.value.testSearch;

    if (!controlValue) {
      this.filteredTestList = [];
      return;
    }

    if (controlValue.indexOf('@') >= 0) {
      const searchIndex: number = controlValue.indexOf('@');
      const searchText: string = controlValue.substr(searchIndex + 1);

      let testFound: boolean;
      let matchedIndex: number;
      const matchedTest: any = this.testList.find((testInfo: any, index: number) => {
        testFound = testInfo.name === searchText;

        if (testFound) {
          matchedIndex = index;
        }

        return testFound;
      });

      if (testFound) {
        this.updateSelectedTests(matchedTest, matchedIndex);
        return;
      }

      this.filteredTestList = this.testList.filter((testInfo: any, index: number) => {
        return testInfo.name.includes(searchText);
      });
    }

    this.filteredTestList = (this.filteredTestList && this.filteredTestList.length) ? this.filteredTestList : [];
    if (this.filteredTestList && this.filteredTestList.length) {
      this.activeItem(0);
    }
  }

  public clearSelection(event: any) {
    if (event.target.value) {
      return;
    }

    const lastItem: any = this.selectedTestsInfo.splice(-1, 1)[0];
    const extraText: string = lastItem.extraText;
    this.testSearchForm.controls.testSearch.setValue(extraText);
    const testInfo = { index: lastItem.index, name: lastItem.name };
    this.testList.splice(lastItem.index, 0, testInfo);
  }

  public moveDown(event: any) {
    if (event.target === this.controlRef.nativeElement) {
      this.activeItem(0);
      this.setFocusOnItem(0);
    } else {
      event.target.nextElementSibling.classList.add('active');
      event.target.classList.remove('active');
      event.target.nextElementSibling.focus();
    }
    event.preventDefault();
  }

  public moveUp(event: any) {
    const listItems = this.listWrapper.nativeElement.getElementsByTagName('li');

    if (event.target === listItems[0].nativeElement) {
      event.target = listItems[-1].nativeElement;
    }

    event.target.previousElementSibling.classList.add('active');
    event.target.classList.remove('active');
    event.target.previousElementSibling.focus();
    event.preventDefault();
  }

  public selectTest(testInfo) {
    this.updateSelectedTests(testInfo, testInfo.index);
    this.controlRef.nativeElement.focus();
  }

  private updateSelectedTests(testInfo: any, index: number): void {
    this.selectedTestsInfo.push(this.filterExtraText(testInfo));
    this.testSearchForm.controls.testSearch.setValue(null);

    const idx = this.testList.findIndex((item: any) => {
      return item.index === index;
    });
    this.testList.splice(idx, 1);
    console.log(this.selectedTestsInfo);
    this.filteredTestList = [];
  }

  private filterExtraText(matchedTestInfo) {
    const extraText: string = this.testSearchForm.value.testSearch.split('@')[0];
    matchedTestInfo.extraText = extraText;
    return matchedTestInfo;
  }

  private activeItem(index) {
    this.listWrapper.nativeElement.getElementsByTagName('li')[index].classList.add('active');
  }

  private setFocusOnItem(index) {
    this.listWrapper.nativeElement.getElementsByTagName('li')[index].focus();
  }
}
