import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('Default number of events shown', ({ given, when, then }) => {
        given('the user has not specified the number of events', () => {

        });
        let AppComponent;
        when('the user views the events', () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            expect(EventListDOM).toBeInTheDocument();
        });

        then(/^the user should see (\d+) events by default$/, async (arg0) => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM =AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });
    });

    test('The user can change the number of events displayed', ({ given, when, then }) => {
        let AppDOM;
        given('a user opens the app',  () => {
            const AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
           
        });

        when('the user changes the value of number of events input', async () => {
            const user = userEvent.setup();
            const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
            const numberOfEventsInput = within(NumberOfEventsDOM).queryByRole('textbox');
            await user.type(numberOfEventsInput, "{backspace}{backspace}{backspace}{backspace}10");
            expect(numberOfEventsInput.value).toBe("10");
        });
        
        then('the user should see the updated number of events', async () => {
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(10);
           });
        });
    });
});