import { TreeNode } from "primeng/api";

export class TreeNodePrimeNgDTO implements TreeNode {
    constructor(values: Object = {}) {
        Object.assign(this, values);
        if (values['children']) {
            this['children'] = [];
            values['children'].forEach(obj => {
                this['children'].push(new TreeNodePrimeNgDTO(obj));
            });
        }
    }
}

