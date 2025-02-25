import { Component, OnInit } from "@angular/core";
import { InspirationService } from "../../services/inspiration.service";

@Component({
  selector: "app-inspiration",
  templateUrl: "./inspiration.component.html",
  styleUrls: ["./inspiration.component.scss"],
})
export class InspirationComponent implements OnInit {
  inspirationalQuote: string = "";
  isLoading: boolean = true;
  errorMessage: string = "";
  timestamp: string | null = null;

  constructor(private inspirationService: InspirationService) {}

  ngOnInit(): void {
    this.loadInspiration();
  }

  loadInspiration(): void {
    const longitude = "18.6671";
    const latitude = "44.5384";

    this.inspirationService.getInspiration(longitude, latitude).subscribe({
      next: (response) => {
        this.inspirationalQuote =
          response?.inspirationalMessage ||
          "Having trouble finding something inspirational :(";
        this.isLoading = false;
        this.timestamp = new Date().toLocaleString();
      },
      error: (err) => {
        this.errorMessage = "Error fetching inspiration";
        this.isLoading = false;
      },
    });
  }
}
