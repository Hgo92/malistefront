import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { API_URL } from "../token";
import { environments } from "../../environments/environments";

export const provideUrl : EnvironmentProviders = makeEnvironmentProviders([
    {
      provide : API_URL,
      useValue: environments.apiUrl,
    }
]);