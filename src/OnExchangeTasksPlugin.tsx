import React from "react";
import * as Flex from "@twilio/flex-ui";
import { FlexPlugin } from "flex-plugin";

import CustomTaskListContainer from "./components/CustomTaskList/CustomTaskList.Container";
import reducers, { namespace } from "./states";
import { TaskChannelCapability, TaskHelper } from "@twilio/flex-ui";
import CustomTaskInfo from "./components/CustomTaskInfo/CustomTaskInfo";
import OnExchangeIcon from "./components/OnExchangeIcon/OnExchangeIcon";

const PLUGIN_NAME = "OnExchangeTasksPlugin";

export default class OnExchangeTasksPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   * @param manager { Flex.Manager }
   */
  init(flex: typeof Flex, manager: Flex.Manager) {
    this.registerReducers(manager);
    this.registerOnExchangeApplicationsChatChannel(flex, manager);

    const options: Flex.ContentFragmentProps = { sortOrder: -1 };

    flex.AgentDesktopView.Panel1.Content.add(
      <CustomTaskListContainer key="OnExchangeTasksPlugin-component" />,
      options
    );
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  private registerReducers(manager: Flex.Manager) {
    if (!manager.store.addReducer) {
      // tslint: disable-next-line
      console.error(
        `You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${Flex.VERSION}`
      );
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }

  registerOnExchangeApplicationsChatChannel(
    flex: typeof Flex,
    _manager: Flex.Manager
  ) {
    const OnExchangeApplicationChannel =
      flex.DefaultTaskChannels.createDefaultTaskChannel(
        "OnExchangeApplication",
        (task) => task.taskChannelUniqueName === "on-exchange-applications",
        "OnExchangeIcon",
        "OnExchangeIcon",
        "deepskyblue"
      );

    OnExchangeApplicationChannel.templates!.TaskListItem!.firstLine = (task) =>
      `${task.attributes.name}`;

    OnExchangeApplicationChannel.templates!.TaskCanvasHeader!.title = (task) =>
      `${task.attributes.name}`;

    OnExchangeApplicationChannel.templates!.IncomingTaskCanvas!.firstLine = (
      task
    ) => task.attributes.email;

    OnExchangeApplicationChannel.templates!.IncomingTaskCanvas!.secondLine = (
      task
    ) =>
      `On-Exchange application: ${task.attributes.planName} - ${task.attributes.carrierName}`;

    OnExchangeApplicationChannel.templates!.IncomingTaskCanvas!.titleLine = (
      _task
    ) => "ON-EXCHANGE APPLICATION SUBMITTED";

    OnExchangeApplicationChannel.icons!.active = (
      <OnExchangeIcon key="active-on-exchange-icon" />
    );
    OnExchangeApplicationChannel.icons!.list = (
      <OnExchangeIcon key="list-on-exchange-icon" />
    );
    OnExchangeApplicationChannel.icons!.main = (
      <OnExchangeIcon key="main-on-exchange-icon" />
    );

    OnExchangeApplicationChannel.capabilities.add(
      "Wrapup" as TaskChannelCapability
    );

    OnExchangeApplicationChannel.templates!.TaskCanvasHeader!.endButton = {
      Assigned: "WRAP UP",
      Reserved: undefined,
      Wrapping: "FINISH APPLICATION",
    };

    flex.TaskChannels.register(OnExchangeApplicationChannel);

    flex.TaskInfoPanel.Content.replace(
      <CustomTaskInfo key="custom-task-info-list" />,
      {
        sortOrder: -1,
        if: (props) =>
          props.task.taskChannelUniqueName === "on-exchange-applications",
      }
    );
  }
}
