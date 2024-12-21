# Chill Pill

### A medication reminder and calender web application

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).



Created by Jack Koskie, Eric Du, and Dushyant Saini

## Concept Plan

### Organizes medications
* Sorts by name and purpose
* Visual identifications (ex. images)
* Portion sizes (ex. multiple pills, fractional pills)
* Time of consumption (ex. how many times per day, before activities like sleeping or eating)

### Makes reminders
* Connected to Google API to send notifications via Gmail, Google Calender, etc.
* Large, easy to read reminders to help elderly people
* Reminds users for all medication related events
  * Taking medicatiosn on a regular basis
  * Picking up refills at the pharmacy
  * Renewing a prescription

### Accessibility
* Language internationalization
  * English
  * French
  * Chinese
  * More... (Future Objective)
* Personalized scheduling
  * Sleeping times
  * Meal times
* Device compatibility
  * Web app that drives to be mobile friendly 
* User friendliness
  * Checklists for taking medications
  * Account system compatible with preexisting accounts (ex. Google, Facebook, etc.)
* Simple user input
  * Manual input of simple information on pill bottles
  * Uses data to create calendar reminders 
  * Adjustable whenever, however you want

## Future Features

Although this web application would aim to be succesful to its intended core audience, a mobile applicaiton that is compatible to any device would be a future goal. Furthermore, this web app would benefit from Optical Character Recognition (OCR) input, facilitating how data woudl be collected from pill bottles and overcoming language barriers, especially in the elderly audience. This would require a complex algorithim to learn how to read the info, as not all bottle labes are in the same layout or on a planar surface. 


## Development History
`12.20.24` - (`Eric Du`); Updated Svelte page

`12.20.24` - (`Eric Du`): Updated README 

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
