<?php

namespace PrestijeLegend\Containers;

use Plenty\Plugin\Templates\Twig;

class TrackingOrderConfirmation
{
    public function call(Twig $twig, $arg):string
    {
        return $twig->render('PrestijeLegend::Containers.TrackingOrderConfirmation', ["orderData" => $arg[0]]);
    }
}