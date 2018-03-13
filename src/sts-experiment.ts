'use strict';

import { commands, Disposable, window } from 'vscode';
import { LanguageClient, RequestType, ExecuteCommandParams} from 'vscode-languageclient';

export function experiment(client : LanguageClient) : Disposable {
    let disp = commands.registerCommand("say.hello", (msg) => window.showInformationMessage("Hello "+msg));

    let executeCommandRequest = new RequestType<ExecuteCommandParams, any, void, void>("experimental/executeCommand");

    client.onReady().then(() => {
        client.onRequest(executeCommandRequest, (params) => {
            return commands.executeCommand(params.command, ...params.arguments);
        });
    });

    return disp;
}