import {Actor, BrowseTheWeb} from 'serenity-js/protractor';
import {protractor} from 'protractor';
import {Start} from '../../spec/Task/start';
import {listOf} from '../../spec/text';
import {AddATodoItem, ItemList, Items} from '../../spec/Task/AddATodoItem';
import {expect} from '../../spec/expect';

export = function todoUserSteps() {

    this.setDefaultTimeout(30 * 1000);  // The todomvc.com website can sometimes be a bit slow to load, so we tell
                                        // Cucumber to give it up to 30 seconds to get ready.
    const actor = Actor.named('James').whoCan(BrowseTheWeb.using(protractor.browser));

    this.Given(/^.*that James has a todo list containing (.*)$/, function (items: string) {
        return actor.attemptsTo(Start.withContaining(listOf(items)));
    });

    this.When(/^s?he adds (.*?) to (?:his|her) list$/, function (itemName: string) {
        return actor.attemptsTo(AddATodoItem.called(itemName))
    });

    this.Then(/^.* todo list should contain (.*?)$/, async function (item: string) {
        const Item_Of_Display = await actor.toSee(new ItemList);
        return expect(Item_Of_Display).eql(listOf(item))
    });
};
