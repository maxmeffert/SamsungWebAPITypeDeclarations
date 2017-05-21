/**
 * https://developer.tizen.org/development/api-references/web-application?redirect=https://developer.tizen.org/dev-guide/3.0.0/org.tizen.web.apireference/html/device_api/mobile/tizen/humanactivitymonitor.html#full-webidl
 */

type HumanActivityType = "PEDOMETER" | "WRIST_UP" | "HRM" | "GPS" | "SLEEP_MONITOR";

type HumanActivityRecorderType = "PEDOMETER" | "HRM" | "SLEEP_MONITOR" | "PRESSURE" ;

type PedometerStepStatus = "NOT_MOVING" | "WALKING" | "RUNNING" | "UNKNOWN" ;

type ActivityRecognitionType = "STATIONARY" | "WALKING" | "RUNNING" | "IN_VEHICLE" ;

type ActivityAccuracy = "LOW" | "MEDIUM" | "HIGH" ;

type SleepStatus = "ASLEEP" | "AWAKE" | "UNKNOWN" ;

interface HumanActivityMonitorManager {

    getHumanActivityData(
        type: HumanActivityType,
        successCallback: HumanActivityMonitorSuccessCallback,
        errorCallback: ErrorCallback): void|never; // raises(WebAPIException);

    start(
        type: HumanActivityType,
        successCallback: HumanActivityMonitorSuccessCallback,
        errorCallback: ErrorCallback): void|never; // raises(WebAPIException);
    
    stop(type: HumanActivityType): void|never; // raises(WebAPIException);

    setAccumulativePedometerListener(changeCallback: HumanActivityMonitorSuccessCallback): void|never; // raises(WebAPIException);

    unsetAccumulativePedometerListener(): void|never; // raises(WebAPIException);

    addActivityRecognitionListener(
        type: ActivityRecognitionType,
        listener: HumanActivityMonitorSuccessCallback,
        errorCallback: ErrorCallback): number|never; // raises(WebAPIException);

    removeActivityRecognitionListener(listenerId: number, errorCallback: ErrorCallback): void; 

    startRecorder(type: HumanActivityRecorderType, option: HumanActivityRecorderOption): void|never; // raises(WebAPIException);

    stopRecorder(type: HumanActivityRecorderType): void|never; // raises(WebAPIException);

    readRecorderData(
        type: HumanActivityRecorderType,
        query: HumanActivityRecorderQuery,
        successCallback: HumanActivityReadRecorderSuccessCallback,
        errorCallback: ErrorCallback): void|never; // raises(WebAPIException);    
}

interface StepDifference {
    readonly stepCountDifference: number;
    readonly timestamp: number;
}

interface HumanActivityRecorderOption {
    interval: number;
    retentionPeriod: number;
}

interface HumanActivityRecorderQuery {
    startTime: number;
    endTime: number;
    anchorTime: number;
    interval: number;
}

interface HumanActivityData {}

interface HumanActivityPedometerData extends HumanActivityData {
    readonly stepStatus: PedometerStepStatus;
    readonly speed: number;
    readonly walkingFrequency: number;
    readonly cumulativeDistance: number;
    readonly cumulativeCalorie: number;
    readonly cumulativeTotalStepCount: number;
    readonly cumulativeWalkStepCount: number;
    readonly cumulativeRunStepCount: number;
    readonly stepCountDifferences: Array<StepDifference>;
}

interface HumanActivityHRMData extends HumanActivityData {
    readonly hearRate: number;
    readonly rRIntefval: number;
}

interface HumanActivityGPSInfo {
    readonly latitude: number;
    readonly longitude: number;
    readonly altitude: number;
    readonly speed: number;
    readonly errorRange: number;
    readonly timestamp: number;
}

interface HumanActivityGPSInfoArray extends HumanActivityData {
    readonly gpsInfo: Array<HumanActivityGPSInfo>;
}

interface HumanActivitySleepMonitorData extends HumanActivityData {
    readonly status: SleepStatus;
    readonly timestamp: number;
}

interface HumanActivityMonitorOption {
    callbackInterval: number;
    sampleInterval: number;
}

interface HumanActivityRecognitionData extends HumanActivityData {
    readonly type: ActivityRecognitionType;
    readonly timestamp: number;
    readonly accuracy: ActivityAccuracy;
}

interface HumanActivityRecorderData {
    readonly startTime: number;
    readonly endTime: number;
}

interface HumanActivityRecorderPedometerData extends HumanActivityRecorderData {
    readonly distance: number;
    readonly calorie: number;
    readonly totalStepCount: number;
    readonly walkStepCount: number;
    readonly runStepCount: number;
}

interface HumanActivityRecorderHRMData extends HumanActivityRecorderData {
    readonly heartRate: number;
}

interface HumanActivityRecorderSleepMonitorData extends HumanActivityRecorderData {
    readonly status: SleepStatus;
}

interface HumanActivityRecorderPressureData extends HumanActivityRecorderData {
    readonly max?: number;
    readonly min?: number;
    readonly average?: number;
}

interface HumanActivityMonitorSuccessCallback {
    (humanactivitydata: HumanActivityData): void;
    // onsuccess(humanactivitydata: HumanActivityData): void;
}

interface HumanActivityReadRecorderSuccessCallback {
    (humanactivitydata: Array<HumanActivityRecorderData>): void;
    // onsuccess(humanactivitydata: Array<HumanActivityRecorderData>): void;
}


