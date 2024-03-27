/* eslint-disable react/prop-types */
export function Events({ events }) {
    return (
        <ul>
            {events?.map((event, index) => (
                <li key={index}>{event}</li>
            ))}
        </ul>
    );
}








