import { Arcane, GetRotationEulerEvent } from 'arcanepad-web-sdk';
import { onMounted } from 'vue';
import { router, lineToRotate, svgCont, showDownloadLineAnim } from './UnlockScene.vue';

onMounted(() => {
    router.push('RevealScene');
    alert('sd');
    return;
    const pad = Arcane.pads[0];

    pad.startGetRotationEuler();
    pad.onGetRotationEuler((e: GetRotationEulerEvent) => {

        lineToRotate.value!.style.transform = `rotate(${-e.pitch - 42}deg)`;
        if (e.pitch < -85) {
            pad.stopGetRotationEuler();
            lineToRotate.value!.setAttribute('stroke', 'yellowgreen');
            lineToRotate.value!.style.transform = `rotate(45deg)`;
            setTimeout(() => {
                svgCont.value!.style.transition = '1s all';
                svgCont.value!.style.opacity = '0';
                showDownloadLineAnim.value = true;
                setTimeout(() => {
                }, 5000);
            }, 1000);
        }
    });
});
