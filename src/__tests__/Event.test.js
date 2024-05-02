import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import mockData from '../mock-data';
import { getEvents } from '../api';

describe('<Event /> component', () => {
    let EventComponent;
    let allEvents;
    beforeEach( async () => {
        allEvents = await getEvents();
        EventComponent = render(<Event event={allEvents[0]} />);
    });
    test('renders event title', () => {
        expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
    });
    test('renders event location', () => {
        expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
    });
    test('renders event start time', () => {
        const startTime = new Date(allEvents[0].start.dateTime).toLocaleString();
        expect(EventComponent.queryByText(startTime)).toBeInTheDocument();
    });
    test('renders the event details button', () => {
        expect(EventComponent.queryByText('show details')).toBeInTheDocument();
    });
    test('event details hidden by default', () => {
        expect(EventComponent.container.querySelector('.deatils')).not.toBeInTheDocument();
    });
    test('renders event details when (show details) button is clicked', async () => {
        const user = userEvent.setup();
        await user.click(EventComponent.queryByText('show details'));
        
        expect(EventComponent.container.querySelector('.details')).toBeInTheDocument();
        expect(EventComponent.queryByText('hide details')).toBeInTheDocument();
        expect(EventComponent.queryByText('show details')).not.toBeInTheDocument();
    });
    test('hide event details when (hide details) button is clicked', async () => {
        const user = userEvent.setup();

        await user.click(EventComponent.queryByText('hide details'));
        expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
        expect(EventComponent.queryByText('hide details')).not.toBeInTheDocument();
        expect(EventComponent.queryByText('show details')).toBeInTheDocument();
    });
});