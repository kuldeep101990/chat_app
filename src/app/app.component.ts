import { Component, effect, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';  // Add CommonModule here
import { MessageService } from './message.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgClass, FormsModule],  // Include CommonModule here
  templateUrl: './app.component.html',
})
export class AppComponent {
  private readonly messageService = inject(MessageService);

  readonly messages = this.messageService.messages; // Get messages from the service
  readonly generatingInProgress = this.messageService.generatingInProgress;

  private readonly scrollOnMessageChanges = effect(() => {
    // Run this effect on every messages change
    this.messages();

    // Scroll after the messages render
    setTimeout(() =>
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })
    );
  });

  sendMessage(form: NgForm, messageText: string): void {
    console.log('see here kk = ', messageText);
    console.log('console kya dekh rhe ho bey');
    // Pass the input to the message service
    this.messageService.sendMessage(messageText);

    // Reset the form
    form.resetForm();
  }

  trackById(index: number, message: { id: string }): string {
    return message.id; // Use id as trackBy key
  }
}
