import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NzIconModule],
  templateUrl: './header.html'
})
export class HeaderComponent {

  @Input() title: string = '';
  @Input() isCollapsed: boolean = false;

  @Output() toggle = new EventEmitter<void>();

  onToggle() {
    this.toggle.emit();
  }
}