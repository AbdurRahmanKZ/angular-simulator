import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Inject,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  @Output()
  public filterChanged = new EventEmitter<string>();

  public readonly filterControl = new FormControl('', {
    nonNullable: true,
  });

  public ngOnInit(): void {
    this.filterControl.valueChanges
      .pipe(
        debounceTime(200),

        map((value: string) => 
        value.trim().toLocaleLowerCase()
      ),

      distinctUntilChanged(),

      takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value: string) => {
        this.filterChanged.emit(value);
      });
  }
}


