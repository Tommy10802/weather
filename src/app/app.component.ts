import { Component } from "@angular/core";
import {
  Router,
  ActivatedRoute,
  RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel
} from "@angular/router";
import { formatDate } from "@angular/common";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent {
  public loading: boolean = true;
  public navLinks: object[];
  private queryDate: string;
  public currentDate: Date = new Date();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router = router;

    this.router.events.subscribe((routerEvent: RouterEvent) => {
      this.checkRouterEvent(routerEvent);
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.queryDate = params["date"];
    });

    this.generateNavUrls();
  }

  checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.loading = false;
    }
  }

  generateNavUrls() {
    this.navLinks = [
      {
        label: "Weather data",
        link: `/weather-data${this.queryDate ? `?date=${this.queryDate}` : ""}`
      },
      {
        label: "Weather chart",
        link: `/weather-chart${this.queryDate ? `?date=${this.queryDate}` : ""}`
      },
      {
        label: "Weather heat calculator",
        link: "/weather-heat-calculator"
      }
    ];
  }

  change(type: string, event: MatDatepickerInputEvent<Date>) {
    this.queryDate = formatDate(event.value, "yyyy/MM/dd/", "en");

    this.router.navigate(
      [
        location.pathname === "/weather-heat-calculator"
          ? "/weather-data"
          : location.pathname
      ],
      {
        queryParams: {
          date: this.queryDate
        }
      }
    );
  }
}
