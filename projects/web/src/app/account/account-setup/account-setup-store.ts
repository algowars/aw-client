import { inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withMethods, withProps, withState } from "@ngrx/signals";
import { UserService } from "../../user/user-service";
import { withMutations } from "@angular-architects/ngrx-toolkit";
import { User } from "../../user/user";
import { injectDispatch } from "@ngrx/signals/events";
import { userEvents } from "../../user/user-store";
import { MessageService } from "primeng/api";
import { ErrorService } from "../../errors/error-service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

export interface AccountSetupStoreState {
    username: string;
}

const initialState: AccountSetupStoreState = {
    username: ""
}

export const AccountSetupStore = signalStore(
    withState(initialState),

    withProps(() => ({
        _userService: inject(UserService),
        _userDispatch: injectDispatch(userEvents),
        _messageService: inject(MessageService),
        _errorService: inject(ErrorService),
        _router: inject(Router)
    })),

    withMutations((store) => ({
        saveAccount: store._userService.createUserMutation({
            onSuccess(user: User) {
                store._userDispatch.setUser(user);
                store._router.navigate(['/problems']);
            },
            onError(error) {
                store._errorService.logError(error);
                const errorMessage = error instanceof HttpErrorResponse ? error.message : "";
                store._messageService.add({ severity: "error", summary: "Error saving account information", detail: errorMessage})
            }
        })
    })),

    withMethods((store) => ({
        updateUsername: signalMethod((username: string) => {
            patchState(
                store, {
                    username
                }
            )
        })
    }))
)