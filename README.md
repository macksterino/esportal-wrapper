# @macksterino/esportal-wrapper

A simple node.js wrapper for the Esportal API. It provides a simple interface for easy interaction.

## Usage
### Installation
`$ npm install --save-dev @macksterino/esportal-wrapper`

### Methods
*Returns all available information for the specified user. The identifier can be either the user id or username.*
- `fetchUserProfile(identifier: string | number): Promise<UserProfile>`

*Returns all available information for the specified team. The identifier can be either the team id or name.*
- `fetchTeamProfile(identifier: string | number): Promise<TeamProfile>`

*Returns all available information for the specified match. The id is the match lobby id.*
- `fetchMatch(id: number): Promise<Match>`

### Examples
For TypeScript:
```
import { Esportal } from "@macksterino/esportal-wrapper";

const esportal = new Esportal();

(async () => {
	const user = await esportal.fetchUserProfile("mankan");
	console.log(user);
})();
```

For JavaScript:
```
const libesportal = require("@macksterino/esportal-wrapper");

const esportal = new libesportal.Esportal();

(async () => {
	const user = await esportal.fetchUserProfile("mankan");
	console.log(user);
})();
```
