import {
  Component,
  computed,
  inject,
  Signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { User, UsersRepository } from '@nx-angular-example/data-access-users';
import { TableColumn, TableComponent } from '@nx-angular-example/table';
@Component({
  imports: [RouterModule, TableComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'nx-angular-example';

  protected readonly users = toSignal(inject(UsersRepository).getUsers(), {
    initialValue: null,
  });
  protected readonly columns: Signal<TableColumn<User>[]> = computed(() => {
    const activeTemplate = this.activeTemplate();
    return [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'active', header: 'Active', cellTemplate: activeTemplate },
    ];
  });

  private readonly activeTemplate =
    viewChild<TemplateRef<unknown>>('activeTemplate');
}
