import { Esportal } from "./index";

const esportal = new Esportal();

(async () => {
	const match = await esportal.fetchMatch(3715056);
	console.log(match);
})();
