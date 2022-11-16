import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

export interface SimpleDate {
  date: number;
  month: number;
  year: number;
}

export interface HeatMapModel {
  [key: string]: {
    color: string;
    opacity?: number;
    idDate?: any;
  };
}
export interface ColorMapModel {
  heatMapColor: string;
  primaryColor: string;
  primaryForeground: string;
  backgroundColor: string;
  previousDateColor?: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass'],
})
export class CalendarComponent implements OnInit, OnChanges {
  /** Constants */
  public static monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  public static dayNames = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sabado',
  ];
  /** Today */
  @Input() public today: SimpleDate;

  /** The page open with [xx, month, year] */
  @Input() public openPage: SimpleDate;

  /** Currently selected date */
  @Input() public selectedDate: SimpleDate;

  /** Array with all the calendar data */
  @Input() public calendar: any[][] = [[]];

  /** Array with all the calendar color data */
  @Input() public ColorMap: ColorMapModel = {
    heatMapColor: '#00ff00',
    primaryColor: '#ff0000',
    primaryForeground: 'white',
    backgroundColor: 'white',
    previousDateColor: '#74C2D1',
  };

  /** Heatmap data */
  @Input() public heatmap: HeatMapModel = {};

  /** Set this to false to hide month changing header */
  @Input() public showHeader = true;
  @Input() public highlightToday = true;

  @Output() submitDateOpenModal: EventEmitter<any> = new EventEmitter();

  /** Emits the new date on change */
  @Output() change: EventEmitter<SimpleDate> = new EventEmitter();

  /** Emits the new month with date as 1 on change */
  @Output() monthChange: EventEmitter<SimpleDate> = new EventEmitter();

  private RGB_HM: any;
  private RGB_Primary: any;
  private RGB_Primary_FG: any;
  private RGB_Background: any;
  private RGB_Disabled: any;

  /* Get RGB from CSS color */
  public static parseColor(input: any) {
    const div = document.createElement('div');
    div.style.color = input;
    document.body.appendChild(div);
    const m = getComputedStyle(div).color.match(
      /^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i
    );
    document.body.removeChild(div);

    if (m) {
      return { R: m[1], G: m[2], B: m[3] };
    } else {
      throw new Error('Color ' + input + ' could not be parsed.');
    }
  }

  /* Get today's date */
  public static getToday(): SimpleDate {
    const dateNow = new Date();
    return {
      date: dateNow.getDate(),
      month: dateNow.getMonth(),
      year: dateNow.getFullYear(),
    };
  }

  /** Pad number with zeros */
  public static zeropad(num: any, padlen: any, padchar = '0'): string {
    const pad_char = typeof padchar !== 'undefined' ? padchar : '0';
    const pad = new Array(1 + padlen).join(pad_char);
    return (pad + num).slice(-pad.length);
  }

  /** return Date  from simpleDate */
  public static getDateObj(date: SimpleDate) {
    return new Date(`${date.year} ${date.month + 1} ${date.date}`);
  }
  /** CalendarComponent */
  constructor() {
    /* Initialize */
    this.calendar = [];

    this.today = CalendarComponent.getToday();
    this.openPage = { ...this.today };
    this.selectedDate = { ...this.today };
  }
  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        let change = changes[propName];
        switch (propName) {
          case 'heatmap': {
            this.heatmap = change.currentValue;
          }
        }
      }
    }
  }

  ngOnInit() {
    /* Parse colors*/
    this.RGB_HM = CalendarComponent.parseColor(this.ColorMap.heatMapColor);
    this.RGB_Primary = CalendarComponent.parseColor(this.ColorMap.primaryColor);
    this.RGB_Primary_FG = CalendarComponent.parseColor(
      this.ColorMap.primaryForeground
    );
    this.RGB_Background = CalendarComponent.parseColor(
      this.ColorMap.backgroundColor
    );
    this.RGB_Disabled = CalendarComponent.parseColor(
      this.ColorMap.previousDateColor
    );
    /* Display initial */
    this.displayCalendar();
  }

  /**
   * Returns true if two dates are the same
   * with the date taken separately
   */
  protected sameDate(date: number, a: SimpleDate, b: SimpleDate): boolean {
    return date === b.date && a.month === b.month && a.year === b.year;
  }

  /** Returns true if fab! */
  protected isFab(col: number): string {
    /* Check if date is selected */
    if (this.sameDate(col, this.openPage, this.selectedDate)) {
      return 'primary';
    }

    /* No matches found */
    return '';
  }
  /** Check if previous date */
  protected previousDay(date: number, a: SimpleDate, b: SimpleDate): boolean {
    return (
      (date < b.date && a.month === b.month && a.year === b.year) ||
      (a.month < b.month && a.year === b.year) ||
      a.year < b.year
    );
  }
  /**Return 'disable' if col is previoys days*/
  public ispreviousDate(col: number) {
    if (this.previousDay(col, this.openPage, this.today)) {
      return 'disable';
    }
    return '';
  }

  /** Returns 'primary' if col is today */
  public isToday(col: number): string {
    if (this.sameDate(col, this.openPage, this.today)) {
      return 'primary';
    }
    return '';
  }

  /** Select a day in the open page */
  public selectDay(col: number, emitEvent: boolean = true) {
    const numOfDays = Number(
      this.getDaysOfMonth(this.openPage.month, this.openPage.year)
    );
    if (col > 0 && col <= numOfDays) {
      this.selectedDate.date = col;
    } else if (col > numOfDays) {
      this.changeMonth(+1);
      this.selectedDate.date = 1;
    } else {
      this.changeMonth(-1);
      const previousMonthDays = Number(
        this.getDaysOfMonth(this.openPage.month, this.openPage.year)
      );
      this.selectedDate.date = previousMonthDays;
    }
    this.selectedDate.month = this.openPage.month;
    this.selectedDate.year = this.openPage.year;
    if (emitEvent) {
      const dateSelected =
        this.heatmap[
          parseInt(
            `${this.selectedDate.year}${
              this.selectedDate.month < 9
                ? '0' + (1 + this.selectedDate.month)
                : 1 + this.selectedDate.month
            }${
              this.selectedDate.date <= 9
                ? '0' + this.selectedDate.date
                : this.selectedDate.date
            }`
          )
        ];

      console.log('this.selectedDate.date', dateSelected);
      if (dateSelected) {
        this.submitDateOpenModal.emit(`${this.selectedDate.date <= 9 ? '0'+this.selectedDate.date : this.selectedDate.date}/${this.selectedDate.month+1}/${this.selectedDate.year}`);
      }

      this.change.emit(this.selectedDate);
    }
  }

  /** Change the month +1 or -1 */
  public changeMonth(diff: number) {
    this.openPage.month += diff;

    /* See if the year switches */
    if (this.openPage.month >= 12) {
      this.openPage.month = 0;
      this.openPage.year++;
    }

    if (this.openPage.month < 0) {
      this.openPage.month = 11;
      this.openPage.year--;
    }

    /* Refresh */
    this.displayCalendar();

    /* Emit event */
    this.monthChange.emit(this.openPage);
  }

  /** Compute the calendar */
  public displayCalendar() {
    /* Generate a new object */
    const newCalendar: any = [[]];

    const month = this.openPage.month;
    const year = this.openPage.year;

    /* Days in next month, and day of week */
    let col = new Date(year, month, 1).getDay();
    let row = 0,
      counter = 1;
    const numOfDays = Number(this.getDaysOfMonth(month, year));

    /* Loop to build the calendar body */
    while (counter <= numOfDays) {
      /* When to start new line */
      if (col > 6) {
        col = 0;
        newCalendar[++row] = [];
      }

      /* Set the value and increment */
      newCalendar[row][col++] = counter++;
    }

    /* Set the calendar to the newly computed one */
    this.calendar = newCalendar;
  }

  /** Gets the DaysPerMonth array */
  protected getDaysOfMonth(month: number, year: number): number {
    /* Check leap years if February */
    if (month === 1 && this.leapYear(year)) {
      return 29;
    }

    /** Return the number of days */
    return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  }

  /** Returns true if leap year */
  protected leapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  /** Gets the heat map color */
  public getHM(day: number): string {
    /* If today */

    if (this.isFab(day)) {
      return `#EC7000`;
    }

    /* Return heatmap color */
    const zeropad = CalendarComponent.zeropad;
    const ind =
      zeropad(this.openPage.year, 4) +
      zeropad(this.openPage.month + 1, 2) +
      zeropad(day, 2);
    if (this.heatmap && ind in this.heatmap) {
      if (this.heatmap[ind].color) {
        const RGB_HM = CalendarComponent.parseColor(this.heatmap[ind].color);
        return `rgba(${RGB_HM.R}, ${RGB_HM.G}, ${RGB_HM.B}, ${
          this.heatmap[ind].opacity ? this.heatmap[ind].opacity : '1.0'
        })`;
      } else {
        return `rgba(${this.RGB_HM.R}, ${this.RGB_HM.G}, ${this.RGB_HM.B},
        ${this.heatmap[ind].opacity ? this.heatmap[ind].opacity : '1.0'})`;
      }
    } else {
      return 'inherit';
    }
  }

  public getForeground(day: number): string {
    /* If today */
    if (this.isFab(day)) {
      return `rgb(${this.RGB_Primary_FG.R}, ${this.RGB_Primary_FG.G}, ${this.RGB_Primary_FG.B})`;
    }
    if (this.isToday(day) && this.highlightToday) {
      return `rgb(${this.RGB_Primary.R}, ${this.RGB_Primary.G}, ${this.RGB_Primary.B})`;
    } else if (this.ispreviousDate(day)) {
      return `rgb(${this.RGB_Disabled.R}, ${this.RGB_Disabled.G}, ${this.RGB_Disabled.B})`;
    }
    return '';
  }

  public getBackground(): string {
    return `rgb(${this.RGB_Background.R}, ${this.RGB_Background.G}, ${this.RGB_Background.B})`;
  }

  public getMonth(month: number) {
    return CalendarComponent.monthNames[month];
  }

  public getDay(day: number) {
    return CalendarComponent.dayNames[day];
  }

  reload() {
    this.heatmap = {};
    this.highlightToday = true;
    this.ColorMap = {
      heatMapColor: '',
      primaryColor: '',
      primaryForeground: '',
      backgroundColor: '',
      previousDateColor: '',
    };
  }

  carregarDadosCalendario(obj: any) {
    this.heatmap = obj.heatmap;
    this.highlightToday = obj.highlightToday;
    this.ColorMap = obj.colorMap;
  }
}
