export const generateRegisterACFBlocksPHP = (blockName: string) => `
<?php
function register_acf_blocks() {
    acf_register_block_type(array(
        'name'              => '${blockName}',
        'title'             => __('${blockName}'),
        'description'       => __('A custom ${blockName} block.'),
        'render_template'   => 'template-parts/blocks/${blockName}/${blockName}.php',
        'category'          => 'formatting',
        'icon'              => 'admin-comments',
        'keywords'          => array('${blockName}'),
    ));
}
add_action('acf/init', 'register_acf_blocks');
`;
