import { useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import { check, request, PERMISSIONS, RESULTS, Permission } from 'react-native-permissions';

interface PermissionState {
    granted: boolean;
    loading: boolean;
    error: string | null;
}

export const usePermissions = (permissionType: 'camera' | 'microphone' | 'storage' | 'location') => {
    const [permissionState, setPermissionState] = useState<PermissionState>({
        granted: false,
        loading: true,
        error: null,
    });

    const getPermission = (): Permission => {
        switch (permissionType) {
            case 'camera':
                return Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
            case 'microphone':
                return Platform.OS === 'ios' ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO;
            case 'storage':
                return Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
            case 'location':
                return Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
            default:
                throw new Error('Unknown permission type');
        }
    };

    const checkPermission = async () => {
        try {
            setPermissionState(prev => ({ ...prev, loading: true, error: null }));

            const permission = getPermission();
            const result = await check(permission);

            setPermissionState({
                granted: result === RESULTS.GRANTED,
                loading: false,
                error: null,
            });

            return result === RESULTS.GRANTED;
        } catch (error) {
            setPermissionState({
                granted: false,
                loading: false,
                error: 'שגיאה בבדיקת הרשאות',
            });
            return false;
        }
    };

    const requestPermission = async () => {
        try {
            setPermissionState(prev => ({ ...prev, loading: true, error: null }));

            const permission = getPermission();
            const result = await request(permission);

            const granted = result === RESULTS.GRANTED;

            setPermissionState({
                granted,
                loading: false,
                error: null,
            });

            if (!granted) {
                Alert.alert(
                    'הרשאה נדרשת',
                    'נדרשת הרשאה לגישה לתכונה זו. אנא הפעל את ההרשאה בהגדרות האפליקציה.',
                    [{ text: 'אישור' }]
                );
            }

            return granted;
        } catch (error) {
            setPermissionState({
                granted: false,
                loading: false,
                error: 'שגיאה בבקשת הרשאות',
            });
            return false;
        }
    };

    useEffect(() => {
        checkPermission();
    }, [permissionType]);

    return {
        ...permissionState,
        checkPermission,
        requestPermission,
    };
};
