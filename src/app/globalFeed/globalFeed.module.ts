import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FeedModule } from "../shared/types/modules/feed/globalFeed.module";
import { GlobalFeedComponent } from "./components/globalFeed/globalFeed.component";

const routes = [
    {
        path: '',
        component: GlobalFeedComponent
    }
]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), FeedModule],
    declarations: [GlobalFeedComponent]
})

export class GlobalFeedModule {}