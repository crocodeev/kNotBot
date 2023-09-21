import { Scenes, Context } from "telegraf";
import { TExpenceObject } from "../types/notion";

export interface CustomWizardSession extends Scenes.WizardSessionData {

	expence: Partial<TExpenceObject>
}

export interface CustomContext extends Context {

	//expence: Partial<TExpenceObject>

	scene: Scenes.SceneContextScene<CustomContext, CustomWizardSession>
	
	wizard: Scenes.WizardContextWizard<CustomContext>
}




