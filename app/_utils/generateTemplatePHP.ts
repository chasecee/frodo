import { generateDynamicTailwindCode } from "./generateDynamicTailwindCode";

export const generateTemplatePHP = (
  blockName: string,
  tailwindCode: string
) => `
<?php
/**
 * Block Name: ${blockName}
 * Description: A custom ${blockName} block.
 */

// The block attributes
$block = $args['block'];

// The block data
$data = $args['data'];

// The block ID
$block_id = $args['block_id'];

// The block class names
$class_name = $args['class_name'];

?>

<div id="<?php echo esc_attr($block_id); ?>" class="<?php echo esc_attr($class_name); ?>">
    ${generateDynamicTailwindCode(tailwindCode)}
</div>
`;
