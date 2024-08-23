export const generateBlockPHP = (blockName: string) => `
<?php
/**
 * Block Name: ${blockName}
 * Description: A custom ${blockName} block.
 */

// $data is what we're going to expose to our render template
$data = array(
    // Add your fields here, e.g.:
    // 'example_field' => get_field('example_field'),
);

// Dynamic block ID
$block_id = '${blockName.toLowerCase()}-' . $block['id'];

// Check if a custom ID is set in the block editor
if (!empty($block['anchor'])) {
    $block_id = $block['anchor'];
}

// Block classes
$class_name = '${blockName.toLowerCase()}-block';
if (!empty($block['className'])) {
    $class_name .= ' ' . $block['className'];
}

/** 
 * Pass the block data into the template part
 */ 
get_template_part(
    'template-parts/blocks/${blockName.toLowerCase()}/template',
    null,
    array(
        'block'      => $block,
        'is_preview' => $is_preview,
        'post_id'    => $post_id,
        'data'       => $data,
        'class_name' => $class_name,
        'block_id'   => $block_id,
    )
);
`;
