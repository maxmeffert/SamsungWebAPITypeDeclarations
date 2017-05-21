
type HumanActivityType = "PEDOMETER" | "WRIST_UP" | "HRM" | "GPS" | "SLEEP_MONITOR";

interface HumanActivityData {}

interface HumanActivityHRMData extends HumanActivityData {
    readonly hearRate: number;
    readonly rRIntefval: number;
}

type HumanActivityMonitorSuccessCallback = (data: HumanActivityData) => void;

interface HumanActivityMonitorManager {
    start(type: HumanActivityType, successCallback: HumanActivityMonitorSuccessCallback, errorCallback: ErrorCallback): void
    stop(type: HumanActivityType): void;
}
