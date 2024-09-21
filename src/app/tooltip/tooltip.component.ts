import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styles: [`
    .tooltip {
      position: absolute;
      background-color: #f2f2f2;
      border: 1px solid #888;
      padding: 8px;
      border-radius: 4px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      pointer-events: none;
      display: block;
    }
  `]
})
export class TooltipComponent {
  @Input() move: any;
  visible: boolean = false;
  positionX: number = 0;
  positionY: number = 0;

  showTooltip(event: MouseEvent, move: any): void {
    this.move = move;
    this.positionX = event.pageX + 15;
    this.positionY = event.pageY + 15;
    this.visible = true;
  }

  hideTooltip(): void {
    this.visible = false;
  }
}
